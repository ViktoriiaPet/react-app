import photo from '../assets/photo_2025-07-26_16-06-02.jpg';

export function AboutPage() {
  return (
    <div>
      <h2>About the author</h2>
      <img src={photo} alt= "Photo of author" style={{
        height: "16vw",
        width: "22vw",
        paddingLeft:"40%"
      }}>
      </img>
      <div
      style={{
        padding: '2vw'
      }}>
      <p>
        My name is Viktoriia, and I am 28 years old.
</p>
I live in Barcelona, Spain. I speak Spanish at a B1 level and also know Catalan and English. I really enjoy learning languages and want to keep improving them.
<p>
I have a university degree in Sociology. I was also a student at the Higher School of Economics, where I studied Data Analysis. Later, I discovered my true passion—programming, and I absolutely love it. It inspires me like nothing else. I enjoy how it combines structure, problem-solving, and creativity.
</p>

<p>
My first experience with coding was at university. I started with R for data analysis and then explored neural networks in Python. However, I realized that my real interest lies in front-end development. I love how visual and interactive it is—every small detail matters and teaches me something new.
</p>


<p>
This course at Rolling Scopes School is my first real experience with front-end development, and it feels like I’ve finally found what truly excites me.
</p>

<p>
I’m a very creative person and love making things with my hands—whether it’s sewing clothes, knitting, or decorating cakes. I’m also a professional pastry chef and can make custom-designed cakes, although now programming has become my main focus.
</p>
<p>
My goals are to significantly improve my programming skills and to learn Chinese—two challenges I’m very motivated to pursue.
      </p>
    </div>
    </div>
  );
}
