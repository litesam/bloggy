---
title: "Fast IO in Java for Competitive Programming!"
date: "February 5, 2020"
---

## Fast IO?

First, let us talk about the main Input classes that you focus on for when you start competitive programming they are most likely will be either `Scanner` or to make your life easier you would've used `InputStreamReader` with a taste for `BufferReader`.

## Scanner!?

`Scanner` is a good class but because it take formatted input as it break it into tokens and then parse that tokens into repsective data types. It tokenize the string on the basis of whitespaces. But, the `Scanner` class is not Thread-safe means multiple threads can produce unwanted results. It usually parse the input which makes it slow. However, the `Scanner` class is simple.

For example consider this sample Java program for Palindrome:
```java
import static java.lang.System.out;

class Palindrome {
  public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    int x = s.nextInt();
    Solution sol = new Solution();
    sol.solve(x);
  }

  static class Solution {
    public void solve(int x) {
      int temp = x;
      int val = 0;
      while (x != 0) {
        int mod = x % 10;
        val *= 10 + mod;
        x /= 10;
      }
      out.println(val == temp);
    }
  }
}
```

## BufferedReader!?

Reason behind `BufferedReader` since Unbuffered I/Os are handled by the Operating System, those I/Os will trigger disk access, so Java created `BufferedReader` it is faster than `Scanner` because it reads the whole line as a single `String` which then can be made sense by the programmer who is writing the code. I'm really not gonna write the Palindrome so here is a Gist of what will you be doing with `BufferedReader`.

```java
class Solution {
  public static void main(String[] args) {
    BufferedReader br = new BufferedReader(new InputStreamReadere(System.in));
    String br = br.readLine();
    // Then the thing that you do with the
    // Strings to make sense of the data that you got
  }
}
```

## Here comes the Fast IO

Finally, the moment that y'all been waiting for! So here is a sample of Fast IO, with a lot of room for optimization for Fast IO:

```java
class Solution {
  public static void main(String[] args) {
    InputStream is = System.in;
    FastScanner fs = new FastScanner(is);
    int val = in.nextInt();
    // Same like Scanner
  }

  static class FastScanner {
    public BufferedReader br;
    public StringTokenizer token;

    public FastScanner(InputStream is) {
      br = new BufferedReader(new InputStreamReader(br));
    }

    public String next() {
      while (token == null || !token.hasMoreTokens()) {
        try {
          token = new StringTokenizer(reader.readLine());
        } catch (IOException e) {
          throw new RuntimeException(e);
        }
      }
      return token.nextToken();
    }
  }

  public int nextInt() {
    return Integer.nextInt(this.next());
  }
  
  // You can add necessary next thingies that you want here!!

}
```

**P.S.** Sorry for not having any benchmarking results over this, but this was something that I found later on by solving many Competitive programming problems thinking and obsessing that my brute force solution was problem(which probably would've been) but on the bright side, it does had a certain ring over time complexity issues, if you looked at the code you can still find that it is just a fancy way of writing `BufferedReader`.
