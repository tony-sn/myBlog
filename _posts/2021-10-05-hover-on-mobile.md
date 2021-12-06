---
layout: single
title: "Hover Effects on Mobile"
excerpt: "A solution to control hover effect on different devices"
date: 2021-10-05 11:51:53 +1000
categories: How-to Web
tags: Mobile CSS Responsive-design
author_profile: true
author: Tony Nguyen
toc_label: "Table of Contents"
toc_icon: "paperclip"
permalink: /posts/hover-on-mobile/
---

## 1 First Attempt of Responsive Web Design:

My knowledge in terms of responsive web design is still too naive. Merely add media queries at the end of the stylesheet file, include some required CSS selectors and CSS rules, then all good to go. That's what I remember from the front end courses which I learned not so long before. However, some behaviours and effects on mobile devices work totally different from what we see on desktop version.

## 2 Mobile devices do not have hover:

I was trying to polish some CTA buttons for my [blog](https://7onynguyen.com) site. Everything seemed fine until I visited it on my mobile. All the hover effects just broke: transitions did not go as the intended direction, no cursor pointer etc.

### Example:

```css
.blog_post_control_item a.read_more_link {
  background-image: linear-gradient(0, var(--secondary), var(--primary));
  background-size: 0;
  transition: 0.5s;
  background-repeat: no-repeat;
}

.blog_post_control_item a.read_more_link:hover {
  background-size: 100%;
  background-color: transparent !default;
}
```

Frustrated with the result, I searched for the solution on google and found some articles about this 'bug':

[Mobile doesn't have hover, dude!](https://bootcamp.uxdesign.cc/mobile-doesnt-have-hover-dude-b37e8e0b586e){:rel="nofollow"}

[Pure CSS ripped with minimal effort](https://codepen.io/finnhvman/post/pure-css-ripple-with-minimal-effort){:rel="nofollow"}

Turn out on mobile it does not have cursor dragging behaviour as on desktop, therefore different interactions during hover state between the two platforms will lead to some unexpected behaviours like I mentioned above. You can read this [article](https://codepen.io/finnhvman/post/pure-css-ripple-with-minimal-effort){:target="\_blank"} if you want to add a ripple effect to both devices, a win-win solution.

My solution is merely disable hover effect on mobile, which is much simpler, then I do not have to worry about hover behaviour on mobile anymore. To do this, I put all hover styles under media tag of my stylesheet file.

### Solution:

{:.orange}

```css
@media (hover: hover) and (pointer: fine) {
  .blog_post_control_item a.read_more_link:hover {
    background-size: 100%;
    background-color: transparent !default;
  }
}
```

That's it. Combining with some <span class="--code">@media only screen</span> and your mobile site is good to go.
