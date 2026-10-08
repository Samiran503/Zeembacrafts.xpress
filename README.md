# ZEEMBA Store (GitHub Pages)

## 1. Pehli baar GitHub par daalna
1. github.com par login karein, **New repository** dabayein. Naam: `zeemba-store`, **Public** chunein, Create.
2. **Add file → Upload files** dabayein. `index.html`, `products.json` aur `images` folder drag karke daalein. **Commit changes**.
3. **Settings → Pages**. Source: **Deploy from a branch**, Branch: **main**, folder: **/(root)**, Save.
4. 1-2 minute baad aapka link: `https://AAPKA-USERNAME.github.io/zeemba-store/`

## 2. Admin kaise karein (product add / edit / delete)
Admin panel yahi hai: **aapka GitHub login**. Aapke account ke bina koi kuch nahi badal sakta.
1. Repo mein `products.json` kholein, upar **pencil (Edit)** icon dabayein.
2. Product badlein, phir **Commit changes**. 1-2 minute mein store update ho jaata hai.

Naya product, `"products": [` list ke end mein is tarah jodein (pichhle product ke baad **comma** zaruri):

```
{
  "id": 9,
  "n": "Wedding Frame",
  "c": "Miniature Frames",
  "p": 399,
  "m": 549,
  "d": "Shaadi ke liye khaas frame.",
  "img": "images/wedding-frame.jpg",
  "t": ["new", "custom"],
  "r": 5,
  "rc": 2
}
```
- `id`: har product ka alag number. `n`: naam. `c`: category (cats mein likha naam hi). `p`: daam. `m`: purana daam (nahi chahiye to 0).
- `t`: badges, `"sale"`, `"new"`, `"custom"` mein se. `r` aur `rc`: rating aur reviews (nahi chahiye to hata dein).
- Delete karne ke liye pura `{ ... }` hata dein, comma ka dhyan rakhein.
- Galti na ho, isliye commit se pehle text ko jsonlint.com par check kar lein.

## 3. Photos
1. Repo mein `images` folder kholein, **Add file → Upload files**, photo daalein, Commit.
2. `products.json` mein `"img": "images/photo-ka-naam.jpg"` likhein.
- Photo 800px tak chhoti karke daalein (squoosh.app), taaki site tez khule.
- Category ki photo `cats` mein `"img"` se, logo `"logo": "images/logo.png"` se lagta hai.
- Naam mein space na rakhein (wedding-frame.jpg).

## 4. Suraksha
- GitHub account mein **2-factor authentication** zaroor on karein.
- Repo public hai, to files sabko dikhti hain. Password ya token kabhi na rakhein.
- WhatsApp number `index.html` mein `917896160761` hai, badalna ho to wahi badlein.
