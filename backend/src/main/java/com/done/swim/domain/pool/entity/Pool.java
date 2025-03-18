package com.done.swim.domain.pool.entity;

import com.done.swim.domain.poolreview.entity.PoolReview;
import com.done.swim.domain.swimmingtime.entity.SwimmingTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.Set;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "pools")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Pool {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String address;

  @Column(nullable = false)
  private String section;

  private String parking;

  private String link;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private Double latitude;

  @Column(nullable = false)
  private Double longitude;

  private String additionalInfo;

  @OneToMany(mappedBy = "pool", fetch = FetchType.LAZY)
  private Set<SwimmingTime> swimmingTimes;

  @OneToMany(mappedBy = "pool", fetch = FetchType.LAZY)
  private Set<PoolReview> poolReviews;


  @Builder
  public Pool(String address, String section, String parking, String link, String name,
      Double latitude, Double longitude, String additionalInfo) {
    this.address = address;
    this.section = section;
    this.parking = parking;
    this.link = link;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.additionalInfo = additionalInfo;
  }

}
