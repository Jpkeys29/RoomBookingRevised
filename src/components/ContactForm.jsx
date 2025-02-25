import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import emailjs from  "@emailjs/browser";
import { auth } from "../firebase/config";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ContactForm() {
    console.log(auth.currentUser)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [message, setMessage] = React.useState("")

    const sendEmail = (e) => {
        e.preventDefault();
        let formData = {
          from_name: auth.currentUser.displayName,
          from_email: auth.currentUser.email,
          to_email: "juanarango29@gmail.com",
          message: message,
        }
        const serviceID = "service_mpg1z4h";
        const templateID = "template_p9meguw";
        const publicKey = "Voz26La_kUnVuQ6VD";
        emailjs
          .send(serviceID, templateID, formData, publicKey)
          .then((response) => {
            console.log("SUCCESS!", response.status, response.text);
            // setStatus("Email sent successfully!");
          })
          .catch((error) => {
            console.error("FAILED...", error);
            // setStatus("Failed to send email. Check your data.");
          });
      };

  return (
    <div>
      <Button onClick={handleOpen}>Contact</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>CONTACT FORM</h1>
          <TextField
            label="Your Message"
            variant='outlined'
            multiline
            minRows={3}
            style={{width:"100%"}}

            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={sendEmail}>SEND</Button>
        </Box>
      </Modal>
    </div>
  );
}
