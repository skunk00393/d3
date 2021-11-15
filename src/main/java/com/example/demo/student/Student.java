package com.example.demo.student;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.Period;

@Entity
@Table
public class Student {
    @Id
    private int year;

    public int getYear() {
        return year;
    }

    public OffsetDateTime getDateCreated() {
        return dateCreated;
    }

    public OffsetDateTime getDateEnded() {
        return dateEnded;
    }

    public Student() {
    }

    public Student(int year, OffsetDateTime dateCreated, OffsetDateTime dateEnded, int value) {
        this.year = year;
        this.dateCreated = dateCreated;
        this.dateEnded = dateEnded;
        this.value = value;
    }

    private OffsetDateTime dateCreated;
    private OffsetDateTime dateEnded;
    public void setYear(int year) {
        this.year = year;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    private int value;
}
