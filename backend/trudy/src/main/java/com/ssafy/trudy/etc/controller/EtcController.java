package com.ssafy.trudy.etc.controller;

import com.ssafy.trudy.etc.model.AreaDto;
import com.ssafy.trudy.etc.model.SigunguDto;
import com.ssafy.trudy.etc.service.EtcService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public List<AreaDto> AreaList(){
        return etcService.findAreaList();
    }

    //선택된 area값을 가져와서 해당하는 sigungu리스트 반환
    @GetMapping("/sigungu")
    public List<SigunguDto> SigunguList(@RequestParam String areacode){
        return etcService.findSigunguList(areacode);
    }
}
