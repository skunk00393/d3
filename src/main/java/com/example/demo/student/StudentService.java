package com.example.demo.student;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository){

        this.studentRepository = studentRepository;
    }
    public List<Student> GetStudents() {
        return studentRepository.findAll();
    }
}

