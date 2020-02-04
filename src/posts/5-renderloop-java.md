---
title: "How to create a render loop in Java"
date: "February, 3 2020"
---

Yeah this is only for Game development, and if you are a person who might use OpenCV extensively you can view this!

## What Render? Loop?

This is conversation is totally gonna be for the programmer in you who is screaming to you as LET US TO CREATE GAMES this will be fuel thrilled for them, 'cos the stuff that I'll be doing here is so esoteric, so come fall in love with Game Development.

**Render Loop** if you want the definition of it go to Google and search yourself.

## Resources in modern Game development

Remember that time when the CPUs are so limited in resources so we have to control what we show to the users by controlling the `render` loop, for making the `update` loop stick around `60fps` or `30fps`. But developments in GPU programming, such as working through `Shaders` made some drastic improvements to create Games without worrying about resources allocation for small Games.

## Stickin' with the title!!

**Put everything in your `Game.java` file.**

So to create a render Loop you need something to render to, and that is gonna be our `Canvas` class. So for the necessary `imports`:

```java
import java.awt.Canvas;
import javax.swing.JFrame;
```

Now this will always gonna be a boilerplate, and the boilerplate is going to be hard to understand.
So we will go everything step by step.

```java
public class Game extends Canvas implements Runnable {

  public final static long serialVersionUID = 1L; // Another boilerplate because of Canvas(class)

  public JFrame frame;

  public Game() {
    frame = new JFrame();
    frame.setPreferredSize(new Dimension(300, 300 / 16 * 9));
  }
}
```
Here we are creating a class Named Game which is a subclass of `Canvas` and also has an contract to the `Runnable` interface, now if you see any kinda error after this step, that is usual because of the `Runnable` interface stating that the class `Game` doesn't have the correct contract or adhere to the `Runnable` interface since it still not overriding its method `run`. So we will fill that `run` thing now.

```java
public Game() {
  ...
}

...

public void run() {
  long lastTime = System.nanoTime(); // gives the time in nanoseconds
  long timer = System.currentTimeMillis(); // gets the time from UNIX Epoch Jan 1, 1970
  double ns = 1000_000_000.0 / 60.0; // that underscores helps you in showing how much zeros are there
  // another way to write ns will be: ns = 1e9 / 60.0;
  double delta = 0;
  int frames = 0;
  int updates = 0;
  while (true) { // our powerful loop that can use your CPU resources.
    long now = System.nanoTime();
    delta += (now - lastTime) / ns;
    lastTime = now;
    while (delta >= 1) { // our 60FPS running loop
      update();
      updates++;
      delta--;
    }
    render();
    frames++;
    if (System.currentTimeMillis() - timer > 1000) { // Calculation to reset the values on every second finishing.
      timer += 1000;
      updates = 0;
      frames = 0;
    }
  }
}
```
Let us go into a deep-dive into what each and every single variables is contributing to our loop. 

`timer` takes the current time value calculation from the UNIX Epoch which is at the midnight at Jan 1, 1970. Don't put much effort into knowing what this is at the moment, we'll come to this later.

`ns` since Java can execute all the program in a fast manner we will be computing in nanoSeconds. The calculation is to split a single second into a 60 frames and that is calculated here.

`delta` is the only thing that will be helping us in giving a calculation on whether the update should be run or not.

`frames` will be going to help us in indentifying on how many times the frames should be running on a single second.

`updates` is going to help us in running the update loop in sync for 60 times in a second.

Now for the `if` block that has the `System.currentTimeMillis() - timer > 1000` condition it is used to reset the variable of the updates and frames for each and every single second so that it can b used to calculate the whole process again.

## For the final render loop and update loop!

You can create the two functions which are `update()` and `render()`. Here the `update()` function will be constrained to be updated on 60 times on a single second. and the `render()` function will be updated based on your CPU power for each second, so perform all the computation related work on your `update()` function.

```java
public void run() {
  ...
}

...

public void update() {
  // This function is solely for your computation related work.
}

public void render() {
  // This function is for displaying the contents to the screen.
}
```

Now for our `main` function, here it is:

```java
...

public static void main(String[] args) {
  Game game = new Game();
  game.frame.setVisible(true); // For making the screen visible to our user
  game.frame.setResizable(false); // Since we have not implemented any responsive patterns it is good to make this false
  game.frame.add(game); // This is to add our Canvas to our JFrame
  game.frame.pack(); // Used to size the frame
  game.frame.setLocationRelativeTo(null); // you can understand by its name itself
  game.frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

  game.start();
}
```

## Part II?

Yeah I will be writing a dedicated Part II for rendering something to the `render()` function on the Part II.

P.S. If you made it here, you've finished completing your render loop aka the topic.