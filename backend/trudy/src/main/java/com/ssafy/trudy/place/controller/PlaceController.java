package com.ssafy.trudy.place.controller;

import com.ssafy.trudy.place.model.PlaceDto;
import com.ssafy.trudy.place.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/place")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    // 장소 정보 API
    @GetMapping()
    public List<PlaceDto> placeListByCategory(@RequestParam(defaultValue = "0") String offset,
                                              @RequestParam(defaultValue = "5") String limit,
                                              @RequestParam(defaultValue = "") String areaSigun,
                                              @RequestParam(defaultValue = "") String contentTypeId,
                                              @RequestParam(defaultValue = "") String keyword) {
        return placeService.findPlaceListByCategory(offset, limit, areaSigun, contentTypeId, keyword);
    }
}