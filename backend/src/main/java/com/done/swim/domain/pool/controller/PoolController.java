package com.done.swim.domain.pool.controller;

import com.done.swim.domain.pool.dto.responseDto.PoolDetailResponseDto;
import com.done.swim.domain.pool.service.PoolService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pools")
public class PoolController {

  private final PoolService poolService;

  @GetMapping("/{id}")
  public PoolDetailResponseDto poolsDetailPage(@PathVariable Long id) {
    return poolService.poolsDetailPage(id);
  }
}
