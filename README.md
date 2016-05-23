# pu.bli.sh
Initial availability to beta testers with an interest in having a pu.bli.sh/x url: example running: http://pu.bli.sh/tbushman. Email thex@pu.bli.sh for inquiry.

#about
pu.bli.sh is a self-publishing domain. The example shown demonstrates the design portfolio/CV application of pu.bli.sh, but any content is supported. Users list image urls and urls for other content, such as pdfs and slideshows, in the [pic[i]] and [iframe] columns of their CartoDB map attribute table. 

Use CartoDB to update the content with your own map. The columns you need are:

[name], [title], [place], [description], [pic1], [pic1_thumb], [pic2], [pic2_thumb], [pic3], [pic3_thumb], [pic4], [pic4_thumb], [pic5], [pic5_thumb], [iframe], [iframe_thumb], [datebegin], [dateend], [link], [linktext]

CartoDB creates other necessary fields for you as you add features to your map.

Use CartoDB's DATE format for your [datebegin] and [dateend] columns. For each image / iframe object url you provide in the [pic1], [pic2],...[iframe] columns, please provide a url in the [pic1_thumb], [pic2_thumb],...[iframe_thumb] columns, as thumnails are loaded first. Empty cells read 'null'.

No need to edit the main.js file. In the html, change the values for 'user_id', 'table_name', and 'json_url' in the hidden form.

Accessibility improvements pending.
