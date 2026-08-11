from math import pow

def hex_to_rgb(hexcode):
    h=hexcode.lstrip('#')
    return tuple(int(h[i:i+2],16) for i in (0,2,4))

def srgb_to_linear(c):
    c=c/255.0
    return c/12.92 if c<=0.03928 else pow((c+0.055)/1.055,2.4)

def rel_lum(hexcode):
    r,g,b=hex_to_rgb(hexcode)
    r_lin=srgb_to_linear(r)
    g_lin=srgb_to_linear(g)
    b_lin=srgb_to_linear(b)
    return 0.2126*r_lin + 0.7152*g_lin + 0.0722*b_lin

def contrast(a,b):
    la=rel_lum(a)
    lb=rel_lum(b)
    L1=max(la,lb)
    L2=min(la,lb)
    return (L1+0.05)/(L2+0.05)

pairs=[
    ('body text','#333333','#FAFAFA'),
    ('h1/h2 text','#2E7D32','#FFFFFF'),
    ('h3 text','#D32F2F','#FFFFFF'),
    ('color-card span','#2E7D32','#FAFAFA'),
    ('btn text','#FFFFFF','#D32F2F'),
    ('header brand','#FFFFFF','#2E7D32'),
    ('small text','#333333','#FFFFFF'),
    ('wireframe text','#222222','#FAFAFA')
]

for name,fg,bg in pairs:
    r=contrast(fg,bg)
    print(f"{name}: fg={fg} bg={bg} -> contrast={r:.2f}")
