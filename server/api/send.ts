import { Resend } from 'resend'

// FIXME remove nuxt-mail, if this works
const resend = new Resend(process.env.NUXT_MAIL_RESEND_API_KEY)
export default defineEventHandler(async () => {
  try {
    const data = await resend.emails.send({
      from: 'Website <mail@pandau.de>',
      to: ['pandau@gmail.com'],
      subject: 'Hello world',
      html: '<strong>It works!</strong>',
    })

    return data
  }
  catch (error) {
    return { error }
  }
})
