package com.done.swim.domain.pool.repository;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.swimmingtime.entity.Week;
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
            """)
    List<Pool> findAllWithUserMark(Long userId);


    @Query("""
            SELECT p
            FROM Pool p
            LEFT JOIN FETCH p.swimmingTimes st
            WHERE p.name = :poolName
            AND (st.dayOfWeek = :nowDayOfWeek OR st IS NULL)
            """)
//    수영 시간 정보가 없는 풀도 포함
    Optional<Pool> getPoolWithName(@Param("poolName") String poolName, @Param("nowDayOfWeek") Week nowDayOfWeek);

    @Query("""
            SELECT p
            FROM Pool p
            LEFT JOIN FETCH p.poolMarks pm
            WHERE p.section = :section
            AND (pm.user.id = :userId OR pm.user IS NULL)
            """)
    List<Pool> findBySectionWithUserId(@Param("section") String section, @Param("userId") Long userId);
}
