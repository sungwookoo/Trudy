package com.ssafy.trudy.controller;

import com.ssafy.trudy.model.Member;
import com.ssafy.trudy.repository.MemberRepository;
import com.ssafy.trudy.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @GetMapping("/")
    public String allMembers() {
        List<Member> list = memberService.allMembers();
        String result = "";
        for(Member m : list) {
            result += m.getId() + ". ";
            result += m.getName() + " / ";
            result += m.getAge() + "세";
            result += "<br>";
        }
        return result;
    }

}
