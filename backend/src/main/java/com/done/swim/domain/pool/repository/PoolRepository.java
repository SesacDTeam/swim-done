package com.done.swim.domain.pool.repository;

import com.done.swim.domain.pool.entity.Pool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PoolRepository extends JpaRepository<Pool, Long> {

    @Query("SELECT p FROM Pool p " +
            "LEFT JOIN FETCH p.swimmingTimes st " +
            "WHERE p.id = :id")
    Optional<Pool> findByIdWithCommentAndTimes(@Param("id") Long id);


    @Query("""
            SELECT DISTINCT p
            FROM Pool p
            LEFT JOIN FETCH p.poolMarks pm
            LEFT JOIN FETCH p.swimmingTimes st
            """)
    List<Pool> findAllWithUserMark(Long userId);


}
