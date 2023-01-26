package com.ssafy.trudy.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @GetMapping("/")
    public List profile() {
        List<Map<String, Object>> res = new ArrayList<Map<String, Object>>();


    }
/*
    [ member_Table *
      member_posts_thumnail_images:
      member_posts_title:
      member_follow(ing):
      member_follow(er):
      member_Introduce_Table *
    ]


 */
}