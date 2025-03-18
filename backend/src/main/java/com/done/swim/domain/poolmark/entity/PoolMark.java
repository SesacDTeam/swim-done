package com.done.swim.domain.poolmark.entity;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "pool_marks")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PoolMark {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @JoinColumn(name = "pool_id")
  @ManyToOne(fetch = FetchType.LAZY)
  private Pool pool;

  @JoinColumn(name = "user_id")
  @ManyToOne(fetch = FetchType.LAZY)
  private User user;

  @Builder
  public PoolMark(Pool pool, User user) {
    this.pool = pool;
    this.user = user;
  }
}
