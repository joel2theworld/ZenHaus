import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import config from '../config/config.js';
import crypto from 'node:crypto';
import nodemailer from 'nodemailer';

// Signup 
export const signupHandler = async (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      phone,
      email,
      password,
      firstName,
      lastName
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.emailUser,
        pass: config.emailPassword
      }
    });

    const mailOptions = {
      to: user.email,
      from: config.emailUser,
      subject: 'Welcome to ZenHaus!',
      html: `
        <html>
          <body>
            <p>Hi ${user.firstName},</p>
            <p>Thanks for signing up!</p>
            <p>Please head over to your profile to create a new property listing.</p>
            <br>
            <p>Best Regards,<br>
            The ZenHaus Team</p>
          </body>
        </html>
      `,
    };
    

     transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({ msg: 'Error sending email' });
      }
      res.status(200).json({ msg: 'Reset link sent to your email' });
    });
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.jwtSecret,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login 
export const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.jwtSecret,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

//Forgot Password
export const forgotPasswordHandler = async (req, res) => {
    const { email } = req.body;
  
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'User not found' });
      }
  
      // Generate reset token
      const resetToken = crypto.randomBytes(20).toString('hex');
  
      // Set token and expiration on user
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
      await user.save();
  
      // Send reset email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.emailUser,
          pass: config.emailPassword
        }
      });
  
      const mailOptions = {
        to: user.email,
        from: config.emailUser,
        subject: 'Password Reset Request',
        html: `
          <html>
            <body>
              <p>Hello,</p>
              <p>You are receiving this email because you (or someone else) requested a password reset for your account.</p>
              <p>Please click the following link to reset your password:</p>
              <p><a href="http://${req.headers.host}/reset/${resetToken}" target="_blank">Reset Password</a></p>
              <p>If you did not request a password reset, please ignore this email and your password will remain unchanged.</p>
              <br>
              <p>Best Regards,<br>
              The ZenHaus Team</p>
            </body>
          </html>
        `,
      };
      
  
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error('Error sending email:', err);
          return res.status(500).json({ msg: 'Error sending email' });
        }
        res.status(200).json({ msg: 'Reset link sent to your email' });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
};

// Reset Password
export const resetPasswordHandler = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
      let user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() } // Ensure token is not expired
      });
  
      if (!user) {
        return res.status(400).json({ msg: 'Invalid or expired token' });
      }
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      // Clear the reset token and expiry
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      await user.save();
  
      res.status(200).json({ msg: 'Password has been reset successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
};