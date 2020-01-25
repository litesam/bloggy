---
title: "LeetCode for fun!"
date: "January 24, 2020"
---

Yes, LeetCode is the topic now, because I got nothing else to talk about?

## I use Reddit

Yeah the social media sites that I hang out is totally different than what you might compare as a social media, all the Memes, stock images, or something that you used to laugh is from either Reddit or 9GAG or Imgur or Twitter. So, believe me you have to start using this social media sites for being in the front seat of what is happening in the world. If you don't have a account on this sites go ahead and create one, Yeah I'll wait!. Here are the links [Reddit](https://reddit.com), [9GAG](https://9gag.com) and [Imgur](https://imgur.com).

## Reddit r/ProgrammerHumor

So I was just going through the feed of [r/ProgrammerHumor](https://reddit.com/r/ProgrammerHumor) and I saw someone saying that "LeetCode's [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/submissions/) should be **hard** not should be in the category of **medium**", that got me piqued so I head over to the website to check whether I have completed the program or not, so after I reached to the website it is good to see that it is not completed by me so that I can try doing something to solve the program and check whether it is **hard** or **medium**.

Also Reddit usually fun to hang around because all the memes are made fresh from there, and exported to all other websites so that other people can view it and laugh about it.

## Madman breaking keys

Consider the string `retweet` now if we start from each character and check for all substrings from that character. So when you start from `r` the substring would be,
```java
r e t w e e t
r, re, ret, retw, retwe, retwee, retweet
```
Well none of the above are palindromes, except for `r` which is the max palindrome here so we have to start from the values again and again for all the characters in here `retweet` are done to get the largest Palindrome, so according to the LeetCode the `ee` is the largest Palindrome in the string retweet, so we may have other possible way to solve this but I'm going to solve this using normal Brute Force way rather than Dynammic Programming's **Top Down** or **Bottom Up** approach to solve this problem.

Based on the speculation I should've stopped here, closed my laptop and should've slept throught the night instead I wrote a O(n ^ 3) algorithm, which is:

```java
public String longestPalindrome(String sequence) {
  String maxs = "";
  int maxl = 0;
  for (int i = 0; i < sequence.length(); ++i) {
    for (int j = i + 1; j < sequence.length(); ++j) {
      String val = sequence.substring(i, j);
      if (isPalindrome(val)) {
        maxl = j - i + 1;
        maxs = sequence.substring(i, j + 1);
      }
    }
  }
  return maxs;
}

private boolean isPalindrome(String s) {
  String rev = "";
  for (int i = s.length() - 1; i >= 0; --i) rev += s.charAt(i);
  if (s.equals(rev)) return true;
  return false;
}
```
That was the worst piece of code. However it passed all the the test case except one stating **Memory Limit Exceeded**, so all I did was instead of creating the local variable `maxs` I changed to **substring return** that is another worst piece of hack and made the code look even more shitier.

## So How did I solve the problem

Based upon the definition of `String` in Java it is immutable so whenever you create a new substring or whenever you add an element to the string using concatenation it creates a garbage for the old one and assign a new memory location to the new String in the memory which is utter waste, so I simply fixed it by creating using 2 variables.


```java
public String longestPalindrome(String s) {
  int maxL = 0;
  int vI = 0;
  int vJ = 0;
  for (int i = 0; i < s.length(); ++i) {
    for (int j = i; j < s.length(); ++j) {
      if (isPalindrome(s.substring(i, j + 1))) {
        if ((j - i + 1) > maxL) {
          maxL = j - i + 1;
          vI = i;
          vJ = j + 1;
        }
      }
    }
  }
  return s.substring(vI, vJ);
}
    
private boolean isPalindrome(String s) {
  for (int i = 0; i < s.length() / 2; ++i) {
    if (s.charAt(i) != s.charAt(s.length() - 1 - i)) {
      return false;
    }
  }
  return true;
}
```
Now did it pass all the tests? Yes, but if I'm going to rate the test as **hard** or **medium**, well this goes to **medium** parsing down a tree or working with graph data structure to calculate the columns length of a old Rome Colosseum is only **hard** other than that everything is **easy** or **medium**.

Now try solving other problems in the LeetCode because solving problems are fun, I feel like Sherlock (The one with the Beetroot Cabbage) it is similar to solving crimes.

## Should I commented the code above?

Well yeah I should have commented the piece of code above that was written in a brute force way go ahead and read that is the easiest bit of code, but still it took me an hour and a half to solve the program maybe I'm starting to loose my logical thinking nerves in my brain which needs a complete brush up, by the way if you click on the solutions tab of the LeetCode for this specific problem it shows different methods that can be used to solve the problem the whole point of LeetCode is to just explore the different solutions and try and learn them out, because it will be more useful. However, we are not going to write any fancy algorithm after finishing all this work on any other applications because all the stuff are already prebuilt.

## All boils down to this :(

Here it is you know the whole point of people selecting Computer Science Engineers is to learn more stuff, but the sad reality is that Money. This is what I was seeing in the YouTube or in Twitch All the Game developers I know created their own Game Engine or creating their own on the livestream, so that they can customize it to create games, but to create a game engine it takes time, but what does the budding growing developers that went to college to study and get CS degree want they just want to know whethere that they can apply what they learned in the College can be used anywhere so they even make a lot of commitment to learn the base and waste time on that instead of creating a complete game with a gameplay.

Believe me when I say this the reason for you guys not seeing any animations in my website is mainly because I'm also trying to reinvent the wheel by creating a new animation library ripped out from the very base itself, so to create animations on hereafter I'm going to use third party libraries which is already laid out and used mostly by everybody.

## You'll be seeing me in many languages!

On the past year I learned many Programming Languages like Lua, Emacs Lisp, ReasonML, Elixir, except for Python I learned many Programming Languages because Python is boring everybody using it already I do not want to be just another Python guy so I was wasting my time in this all other languages, so you guys will be seeing me using this different languages in upcoming blog posts.


**P.S.** Sorry for the Syntax Highlighting I really don't know how to configure the PrismJS in my code because all the files are uploaded in Markdown and I don't know how to style this individually.

**P.S.** You guys can always fork the repository and add some changes and do a Pull Request (PR) on the repository link, I will surely take a look at it and if I liked the changes I will merge it with the project for sure. I'll also open a **Good first Issue** for the PrismJS highlighting problem that I have which I don't know how to solve. So this will help me in learning new ways to work with other people.