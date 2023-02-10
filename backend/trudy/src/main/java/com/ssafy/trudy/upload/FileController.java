package com.ssafy.trudy.upload;

import com.ssafy.trudy.auth.security.dto.PrincipalDetails;
import com.ssafy.trudy.member.model.dto.MemberResponse;
import com.ssafy.trudy.planner.model.DayItem;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Tag(name = "post", description = "게시물 API")
@RestController
@RequestMapping("/api")
@Slf4j
@RequiredArgsConstructor
@CrossOrigin("*")
public class FileController {
    private final AwsS3Uploader awsS3Uploader;

//    @PostMapping("/member/upload")
//    public MemberResponse memberUpload(@RequestParam("file") MultipartFile multipartFile, @AuthenticationPrincipal PrincipalDetails principal) throws IOException {
//        return awsS3Uploader.createMemberFile(multipartFile, "member", principal);
//    }

//    @PostMapping("/post/upload")
//    public String postUpload(@RequestParam("file") MultipartFile multipartFile) throws IOException {
//        String fileName = awsS3Uploader.createPostFile(multipartFile, "post");
//        return fileName;
//    }

    @PostMapping("/planner/upload")
    public DayItem plannerUpload(@RequestParam("file") MultipartFile multipartFile, Long dayItemId) throws IOException {
        return awsS3Uploader.createCustomDayItemFile(multipartFile, "planner", dayItemId);
    }
}