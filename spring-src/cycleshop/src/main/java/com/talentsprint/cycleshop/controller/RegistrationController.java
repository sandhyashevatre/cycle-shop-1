package com.talentsprint.cycleshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.talentsprint.cycleshop.business.UserForm;
import com.talentsprint.cycleshop.entity.User;
import com.talentsprint.cycleshop.service.DomainUserService;
import com.talentsprint.cycleshop.service.UserService;

@RestController
@RequestMapping("/register")
public class RegistrationController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
	private DomainUserService domainUserService;

    @GetMapping
    public String getRegistrationForm(Model model) {
        if (!model.containsAttribute("userForm")) {
            model.addAttribute("userForm", new UserForm());
        }
        return "register";
    }

    @PostMapping
    public String register(@RequestBody UserForm userForm
//    BindingResult bindingResult, 
//    RedirectAttributes attr
    		) {
//        if (bindingResult.hasErrors()) {
//            attr.addFlashAttribute("org.springframework.validation.BindingResult.userForm", bindingResult);
//            attr.addFlashAttribute("userForm", userForm);
//            return "redirect:/register";
//        }
//        if (!userForm.getPassword().equals(userForm.getPasswordRepeat())) {
//            attr.addFlashAttribute("message", "Passwords must match");
//            attr.addFlashAttribute("userForm", userForm);
//            return "redirect:/register";
//        }
        User userToCreate = new User();
        userToCreate.setName(userForm.getName());
        userToCreate.setPassword(userForm.getPassword());
        userToCreate.setRole(userForm.getRole());
        System.out.println(userForm.getName());
//        domainUserService.save(userForm.getName(), userForm.getPassword(),userForm.getRole());
        userService.create(userToCreate);
        //attr.addFlashAttribute("result", "Registration success!");
        return "redirect:/loginpage";
    }

}
