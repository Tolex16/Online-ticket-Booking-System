package com.example.ecommerce.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;


@Service
@RequiredArgsConstructor
public class EmailService {

   @Autowired
   private final JavaMailSender javaMailSender;

public void sendPasswordMail(String to, String firstName, String token) {
    String subject = "Password Reset Notification";
    
    // Customize the email body with HTML formatting
    String body = "<html>"
                + "<body>"
                + "<h2>Hello " + firstName + ",</h2>"
                + "<p>We have received a request to reset your password.</p>"
                + "<p>Please use the following OTP to reset your password:</p>"
                + "<p><strong>" + token + "</strong></p>"
                + "<p>If you did not request this password reset, please ignore this email.</p>"
                + "<p>Best regards,<br>"
                + "To-Pro E-commerce Tech Support</p>"
                + "</body>"
                + "</html>";
    
    MimeMessage message = javaMailSender.createMimeMessage();
    try {
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body, true); // Enable HTML content
        helper.setFrom(new InternetAddress("tolex20004real@gmail.com", "To-Pro E-commerce Tech Support"));
        
        javaMailSender.send(message);
    } catch (MessagingException | UnsupportedEncodingException e) {
        // Handle exception
        e.printStackTrace();
    }
}

}
