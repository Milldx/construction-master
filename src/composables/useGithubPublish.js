import { useAdmin } from './useAdmin.js'

/*
  ═══════════════════════════════════════════════════════════
  useGithubPublish — отправляет новый текст файла в репозиторий
  через GitHub Contents API. После этого GitHub Actions (см.
  .github/workflows/deploy.yml) автоматически пересобирает
  и публикует сайт — это и даёт «видно всем без ручной заливки».
  ═══════════════════════════════════════════════════════════

  GitHub принимает содержимое файла в формате base64. Обычный
  браузерный btoa() ломается на кириллице (он понимает только
  Latin1), поэтому кодируем через TextEncoder — он correctно
  переводит UTF-8 текст в байты перед base64.
*/
function utf8ToBase64(str) {
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  bytes.forEach((b) => { binary += String.fromCharCode(b) })
  return btoa(binary)
}

export function useGithubPublish() {
  const { owner, repo, token } = useAdmin()

  /*
    publishFile — главная функция.
    path     — путь к файлу В РЕПОЗИТОРИИ, например 'src/data/services.js'
    content  — НОВОЕ содержимое файла целиком (обычный текст)
    message  — текст коммита (то, что увидишь в истории на GitHub)

    Возвращает { success: true } или { success: false, error: '...' }
  */
  async function publishFile(path, content, message) {
    const apiUrl = `https://api.github.com/repos/${owner.value}/${repo.value}/contents/${path}`
    const headers = {
      Authorization: `token ${token.value}`,
      Accept: 'application/vnd.github+json',
    }

    try {
      // Шаг 1 — узнаём текущий sha файла.
      // GitHub требует sha ТЕКУЩЕЙ версии файла, чтобы не перезаписать
      // случайно чьи-то параллельные изменения — это называется optimistic locking.
      const getRes = await fetch(apiUrl, { headers })
      if (!getRes.ok) {
        return { success: false, error: `Не нашёл файл ${path} в репозитории (${getRes.status}).` }
      }
      const fileInfo = await getRes.json()

      // Шаг 2 — отправляем новое содержимое с этим sha
      const putRes = await fetch(apiUrl, {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          content: utf8ToBase64(content),
          sha: fileInfo.sha,
        }),
      })

      if (!putRes.ok) {
        const errBody = await putRes.json().catch(() => ({}))
        return { success: false, error: errBody.message || `GitHub вернул ошибку ${putRes.status}.` }
      }

      return { success: true }
    } catch (e) {
      return { success: false, error: 'Не удалось связаться с GitHub. Проверь интернет-соединение.' }
    }
  }

  return { publishFile }
}
