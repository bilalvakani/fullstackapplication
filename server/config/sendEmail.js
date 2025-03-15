import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

if(!process.env.RESEND_API) {
  console.log('RESEND_API is required');
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({sendTO, subject, html}) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'bilalVakani <onboarding@resend.dev>',
            to: sendTO,
            subject: subject,
            html: html,
        });
        if (error) {
            return console.error({ error });
        }
        return data
        
    } catch (error) {
        console.log(error);
    }
}


export default sendEmail;
// import { Resend } from 'resend';
// import dotenv from 'dotenv';
// dotenv.config();

// if(!process.env.RESEND_API) {
//   console.log('RESEND_API is required');
// }

// const resend = new Resend(process.env.RESEND_API);


// const sendEmail = async ({ sendTO, subject, html }) => {
//     try {
//         // Allowed email address for testing
//         const allowedEmail = 'useo0969@gmail.com'; // Bilal ki email address yahan daalain

//         // Agar sendTO yeh email hai, to bhejna allow karain
//         if (sendTO !== allowedEmail) {
//             return console.error('Aap sirf testing email address par emails bhej sakte hain.');
//         }

//         // Email send karna
//         const { data, error } = await resend.emails.send({
//             from: 'bilalVakani <onboarding@resend.dev>', // Ye aapka test email address hai
//             to: sendTO,
//             subject: subject,
//             html: html,
//         });

//         if (error) {
//             return console.error({ error });
//         }

//         return data; // Agar email bhej diya gaya ho to data return karain
//     } catch (error) {
//         console.log(error);
//     }
// };
// export default sendEmail;
