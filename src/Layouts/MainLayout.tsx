import { Fragment } from 'react/jsx-runtime';
import './MainLayout.css';

function MainLayout() {
  return (
    <Fragment>
      <header>
        <h1>Dashboard</h1>
      </header>
      {/* <section>App name</section>
      <nav>
        <ul>
          <li>Dashboard</li>
          <li>Messages</li>
          <li>Settings</li>
        </ul>
      </nav>
      <aside>
        <section>
          <h1>Nodes</h1>
          <ol>
            <li>Node 1</li>
            <li>Node 2</li>
          </ol>
        </section>
      </aside>
      <main>
        <section>Content</section>
      </main> */}
      <article>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          suscipit nunc ut ligula mollis gravida. Integer eget orci quis mi
          porttitor tempor. Praesent convallis vehicula nibh, vitae pharetra
          enim. Vestibulum a fringilla quam, in egestas dui. Phasellus quis orci
          tincidunt, porttitor turpis sed, feugiat risus. Suspendisse tristique
          sapien ac felis pretium, id volutpat nulla accumsan. Suspendisse ipsum
          tortor, lacinia ac arcu vel, pretium ornare urna.
        </p>
        <p>
          Aliquam commodo lacinia posuere. Nullam non congue velit. Nulla luctus
          gravida aliquam. Proin mollis nisl mi, id dignissim risus euismod et.
          In hac habitasse platea dictumst. Proin pulvinar sollicitudin nunc,
          non fringilla sapien finibus eget. Nunc vestibulum lacinia metus non
          rhoncus. Fusce consequat vel sem nec cursus. Aenean mollis sapien ex,
          sed congue elit consequat eu. Nulla suscipit cursus eros, a vehicula
          leo semper vitae.
        </p>
        <p>
          Pellentesque condimentum pellentesque dolor at luctus. Pellentesque eu
          sapien tristique, mollis magna rutrum, pharetra lacus. Pellentesque
          laoreet placerat accumsan. Suspendisse quis porttitor nisl. Integer
          vel vehicula eros, sed porta mauris. In hac habitasse platea dictumst.
          In lacinia faucibus nisi, sit amet ultricies nibh pellentesque id.
          Phasellus volutpat lacus arcu, nec tristique dui condimentum id. Cras
          bibendum et tortor at tristique.
        </p>
      </article>
      <section id='chat-tab'>
        <p>chat tab</p>
      </section>
    </Fragment>
  );
}

export default MainLayout;
