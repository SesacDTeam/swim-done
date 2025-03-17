package com.done.swim.domain.swimmingtime.repository;

import com.done.swim.domain.swimmingtime.entity.SwimmingTime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SwimmingTimeRepository extends JpaRepository<SwimmingTime, Long> {
}
