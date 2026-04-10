## Admin-panel-v1 -- Administrative panel 

Hello! I am glad to see you in this repository. 

I want to talk about my development, which is actually only part of a full-fledged project. At first, I just wanted to make a one-page repository to fill out my portfolio, but I liked this page and the possibilities that can be implemented so much that I wanted to make it a fully functional tool that can be used in real business tasks. Of course, I have never worked with such systems and I am sure that ready-made proposals provide much more opportunities, but as an illustrative project that can be shown as my portfolio, I think this is more than enough. The main idea of this project was initiative - I plan, schedule and implement tasks. 

In addition, in this repository and the project as a whole, for the most part I tried to learn how to work in git not in theory, but in practice. I've been working with branches and looking at how they behave in real-world tasks, and now I have a "minimal" idea of what they are.

---

## What's on the site

Dashboard (`index.html`) is the main page that the user gets to when opening this site. This page contains basic information about the changes.

*Customers (`customers.html`) is a page where customer control is implemented. This page shows the number of registered clients, new, active and lost. In addition, filters are implemented for quick search. These filters allow you to find a user by id, name, email, phone number, potential, status, amount. Below is a list of clients that takes information from the js array in a separate file. I did not connect a full-fledged database, because they need a server, which I do not have, at least at the moment. Because this is a demonstration project, I'm only doing this for demonstration purposes. In addition to the customer database, there are also algorithms that read customers and their orders and, based on this, show which customers should be given more attention so as not to lose them. In addition, from this page there is a direct opportunity to write to the client in a chat, which is also available. 

*Orders (`orders.html`) - the orders page. This page implements the orders that customers make. The functionality visually and technically resembles customers.html , but it differs in algorithms and information. The page has filters that allow the user to quickly find the required order by id, name, email, phone number, status, payment, from/to date. In addition, there are some algorithms that, for example, show the order process and a list of countries from which the order was placed. 

*Analytics (`analytics.html`) - The analytics page is needed to make it easier for the user to figure out how to improve sales or track investigative links, such as seasonal fluctuations. There are also top countries from which purchases were made. 
On this page, for the first time, I worked with a third-party library in order to create an interactive order chart. This chart shows the latest orders that have been placed. In addition, you can select a specific date in order to view which orders were placed during a particular time period. Below are the algorithms that I have already written about. In other words, the user can view the funnel. There is a bounce analysis on the right and the reason for the orders not being processed. There are also full-fledged order statistics by country. In other words, the user can see which orders were perfect in all countries and find out in which country the product is more popular. 

*Messages (`messages.html`) - The page is designed to connect managers and clients. In the real project, a client chat will also be implemented (it has already been implemented, you just need to connect the appropriate APIs). The user selects the user he wants to write on the page customers.html or orders.html and goes directly to the right chat with the right client. There is also a history of recent chats that contain correspondence with clients. This is necessary in order not to switch between pages every time and work with several people at the same time.

*Products (`products.html`) - This page implements the technology of viewing and editing the order. Since this admin panel is designed for an online store, this page is one of the most important in the entire panel. It provides full user control over the products and prices that customers see on the main site. The functionality allows you to set up seasonal sales, discounts, and the ability to edit the name, description, and photos of the product. Also, for convenience, a button has been added that adds a new product right on this page. In addition, there is a separate button on the left sidebar that allows the user to quickly add a new product if it is on another page. On this page, this button has been removed from the left menu due to its uselessness.

*Reports (reports.html ) - at the planning stage

*Settings (`settings.html`) - at the planning stage

*Add Product (`add-product.html`) - A button that will take the user to the page. products.html already with the window open to add the product more conveniently. 

---

## Cool features that are found on all pages, but they are small in order to prescribe them separately for each page

* Light/Dark theme - Theme switching works, which also switches automatically when the theme is switched on the device. That is, when a user visits a website and a dark theme is running, the website adopts a dark theme. If the user has a light theme, then the site runs on a light theme.

* Language Switching - Language switching works. I have tried to translate the entire site from English to Russian as much as possible. That is, the full localization of the site in English and Russian is working. In the future, it is planned to add more Ukrainian and German for the possibility of expanding the working staff and the corresponding convenience. 

* Clicking on the avatar, which is located in the upper-right corner, opens the user's menu, which can switch and return to the site. At the moment, in this repository and project, this panel contains links to my social networks.networks and other projects that are related to me, so this is just an indicative opportunity that generally does not affect anything and is only needed for future integration.
