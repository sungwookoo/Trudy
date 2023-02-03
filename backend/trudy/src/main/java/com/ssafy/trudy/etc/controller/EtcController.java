package com.ssafy.trudy.etc.controller;

import com.ssafy.trudy.etc.service.EtcService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/etc")
@Slf4j
@RequiredArgsConstructor
public class EtcController {

    @Autowired
    private final EtcService etcService;

    //area리스트 반환(시,도)
    @GetMapping("/area")
    public void AreaList(){
        return etcService.List<String> findAreaList() =
    }

    //선택된 area값을 가져와서 해당하는 sigungu리스트 반환
    @GetMapping("/sigungu/{area_code}")
    public void SigunguList(){

    }





}
