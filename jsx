const sendNotification = async () => {
  await fetch(import.meta.env.VITE_CEO_NOTIFICATION_WEBHOOK, {
    method: 'POST',
    body: JSON.stringify({ message: '🚀 Fast Load Pro linked to nidbiz.com' }),
    headers: { 'Content-Type': 'application/json' }
  })
}
