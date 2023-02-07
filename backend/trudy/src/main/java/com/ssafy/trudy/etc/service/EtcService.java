package com.ssafy.trudy.etc.service;

import com.ssafy.trudy.etc.model.Area;
import com.ssafy.trudy.etc.model.AreaDto;
import com.ssafy.trudy.etc.model.Sigungu;
import com.ssafy.trudy.etc.model.SigunguDto;
import com.ssafy.trudy.etc.repository.AreaRepository;
import com.ssafy.trudy.etc.repository.SigunguRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class EtcService {

    private final AreaRepository areaRepository;
    private final SigunguRepository sigunguRepository;

    public List<AreaDto> findAreaList(){
        List<Area> areaAll = Optional.ofNullable(areaRepository.findAll()).orElseThrow(() -> new BadCredentialsException("error"));
        return areaAll.stream().map(area -> AreaDto.builder()
                .id(area.getCode())
                .name(area.getName())
                .build()).collect(Collectors.toList());
    }

    public List<SigunguDto> findSigunguList(String inputAreaCode){
        Long cashAreaCode = Long.parseLong(inputAreaCode);
        Area areacode = areaRepository.findByCode(cashAreaCode);
        List<Sigungu> sigunguByArea = Optional.ofNullable(sigunguRepository.findAllByAreaCode(areacode)).orElseThrow(() -> new BadCredentialsException("error"));
        return sigunguByArea.stream().map(sigungu -> SigunguDto.builder()
                .id(sigungu.getId())
                .code(sigungu.getCode())
                .areaCode(sigungu.getAreaCode())
                .name(sigungu.getName())
                .build()).collect(Collectors.toList());
    }
}
