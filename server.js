const express = require('express');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');
const youtubedl = require('youtube-dl-exec');

const app = express();
const PORT = process.env.PORT || 3000;
const DOWNLOAD_ROOT = path.join(__dirname, 'downloads');

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

if (!fs.existsSync(DOWNLOAD_ROOT)) {
  fs.mkdirSync(DOWNLOAD_ROOT, { recursive: true });
}

function isYouTubeUrl(value) {
  if (!value || typeof value !== 'string') return false;
  return /^https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\//i.test(value.trim());
}

async function downloadMp4(url) {
  const sessionId = randomUUID();
  const sessionDir = path.join(DOWNLOAD_ROOT, sessionId);
  fs.mkdirSync(sessionDir, { recursive: true });

  const outputPattern = path.join(sessionDir, '%(title)s.%(ext)s');

  await youtubedl(url, {
    format: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
    output: outputPattern,
    mergeOutputFormat: 'mp4',
    noWarnings: true,
    noCheckCertificates: true,
    addHeader: [
      'referer:youtube.com',
      'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
    ]
  });

  const files = fs.readdirSync(sessionDir)
    .filter((file) => /\.(mp4)$/i.test(file))
    .sort((a, b) => fs.statSync(path.join(sessionDir, b)).mtimeMs - fs.statSync(path.join(sessionDir, a)).mtimeMs);

  if (!files.length) {
    throw new Error('MP4 file could not be created. Please try a different video or check if ffmpeg is installed.');
  }

  return {
    filePath: path.join(sessionDir, files[0]),
    fileName: files[0]
  };
}

app.post('/api/download', async (req, res) => {
  const { url } = req.body || {};

  if (!isYouTubeUrl(url)) {
    return res.status(400).json({ error: 'YouTubeの動画URLを入力してください。' });
  }

  try {
    const { filePath, fileName } = await downloadMp4(url.trim());

    res.download(filePath, fileName, (error) => {
      if (error) {
        console.error('Download send error:', error.message);
      }

      try {
        fs.rmSync(path.dirname(filePath), { recursive: true, force: true });
      } catch (cleanupError) {
        console.error('Cleanup failed:', cleanupError.message);
      }
    });
  } catch (error) {
    console.error('Download error:', error.message);
    res.status(500).json({
      error: 'ダウンロードに失敗しました。動画が非公開または制限されている可能性があります。'
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Server is running.' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
