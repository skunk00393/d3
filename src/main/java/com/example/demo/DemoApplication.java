package com.example.demo;

import com.example.demo.student.Student;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.example.demo.student.StudentRepository;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@SpringBootApplication
public class DemoApplication {
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	public CommandLineRunner demoData(StudentRepository studentRepository) {
		return args ->{
			List<Student> studenti=new ArrayList();
			Date date = new Date(1436360943);
			OffsetDateTime offsetDateTime = date.toInstant().atOffset(ZoneOffset.UTC);
			Date date2 = new Date(1436890943);
			OffsetDateTime offsetDateTime2 = date2.toInstant().atOffset(ZoneOffset.UTC);
			Student eden = new Student(2015, offsetDateTime, offsetDateTime2, 5);
			studenti.add(eden);
			date = new Date(1437460943);
			offsetDateTime = date.toInstant().atOffset(ZoneOffset.UTC);
			date2 = new Date(1439498943);
			offsetDateTime2 = date2.toInstant().atOffset(ZoneOffset.UTC);
			Student dva = new Student(2018, offsetDateTime, offsetDateTime2, 4);
			studenti.add(dva);
			date = new Date(1436380943);
			offsetDateTime = date.toInstant().atOffset(ZoneOffset.UTC);
			date2 = new Date(1456398943);
			offsetDateTime2 = date2.toInstant().atOffset(ZoneOffset.UTC);
			Student tri = new Student(2017, offsetDateTime, offsetDateTime2, 5);
			studenti.add(tri);
			studentRepository.saveAll(studenti);
		};
	}
}


