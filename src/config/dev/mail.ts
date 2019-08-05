
export const Mail = {
    info: {        
        host: 'smtp.gmail.com', // hostname
        secure: true, // use SSL
        port: 465, // port for secure SMTP
        transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
        auth: {
            user: 'dev4vin@gmail.com',
            pass: 'Parachute100'
        }
    },
   
    accounts: {        
        host: 'smtp.mailtrap.io', // hostname
        secure: true, // use SSL
        port: 465, // port for secure SMTP
        transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
        auth: {
            user: 'ce671453ccfdc6',
            pass: '2f1e18a5b6e251'
        }
    }
}