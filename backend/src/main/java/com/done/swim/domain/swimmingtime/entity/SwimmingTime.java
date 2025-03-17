package com.done.swim.domain.swimmingtime.entity;

import com.done.swim.domain.pool.entity.Pool;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Entity
@Table(name = "swimming_times")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SwimmingTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pool_id")
    private Pool pool;

    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false)
    private LocalTime endTime;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Week dayOfWeek;

}
