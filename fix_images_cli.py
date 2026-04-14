import os, subprocess, glob
from PIL import Image

pdf_file = '/home/ruben/Downloads/all-pages.pdf'
base_dir = '/media/insync/DATA/aprendizaje-ia'
map_p = {
    7:'elementos-comunes', 8:'encuesta-red-universitaria', 9:'desarrollo-hibrido', 10:'continuo-hibrido',
    11:'ciclo-estudiante', 12:'ciclo-profesor', 14:'dilema-habilidades', 15:'bloom-invertida',
    16:'samr-bloom', 17:'icap-tabla', 18:'cat-tecnicas', 19:'diseno-inverso', 20:'syllabus-elementos',
    22:'profesor-moderno'
}

for page, bname in map_p.items():
    print('Processing', bname)
    subprocess.run(['pdftoppm', '-png', '-f', str(page), '-l', str(page), pdf_file, '/tmp/pageT'])
    cands = glob.glob(f'/tmp/pageT*{page:02d}*.png')
    if not cands: cands = glob.glob('/tmp/pageT*.png')
    if not cands:
        print('no image found for', bname)
        continue
    png_file = cands[0]
    
    img = Image.open(png_file)
    mask = img.convert('L').point(lambda p: 255 if p < 240 else 0, mode='1')
    w, h = img.size
    t_c, b_c = int(h*0.13), h-int(h*0.08)
    sub = mask.crop((0, t_c, w, b_c)).getbbox()
    
    if sub:
        l,t,r,b = max(0,sub[0]-20), max(0,sub[1]+t_c-20), min(w,sub[2]+20), min(h,sub[3]+t_c+20)
        img = img.crop((l,t,r,b))
        
    for root, d, files in os.walk(base_dir):
        if 'content' in root or 'public' in root:
            if bname+'.webp' in files:
                p = os.path.join(root, bname+'.webp')
                img.save(p, 'WEBP', quality=90)
                print(' -> saved', p)
    for c in glob.glob('/tmp/pageT*.png'): os.remove(c)

print('All images checked and replaced.')
