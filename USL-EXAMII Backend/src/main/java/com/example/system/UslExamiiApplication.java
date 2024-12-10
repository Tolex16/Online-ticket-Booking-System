package com.example.system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class UslExamiiApplication {

	public static void main(String[] args) {
		SpringApplication.run(UslExamiiApplication.class, args);
	}

}
