package com.ssafy.trudy.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// 짱배의 똥칠 - 짭으로 데이터 보내놓음
@RestController
@RequestMapping("/api/posts")
public class PostsController {

    @GetMapping("/")
    public List allPosts() {
        List<Map<String,Object>> res = new ArrayList<Map<String, Object>>();

        for(int i = 0; i < 10; i++) {
            Map<String,Object> map = new HashMap<>();
            map.put("id", i);
            map.put("title", "first posts");
            map.put("content", "rock the world");
            map.put("thumbnail_image_id", 1);
            map.put("post_likes", 3);
            map.put("user_post_like", true);
            map.put("posts_category", )
            res.add(map);
        }

        return res;
    }
}
