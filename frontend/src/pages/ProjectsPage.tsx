import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import ProjectList from '../components/EntertainerList';
import WelcomeFunc from '../components/WelcomeFunc';
import CartSummary from '../components/CartSummary';

function ProjectsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      <CartSummary />
        <WelcomeFunc />
      <br />
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          <ProjectList selectedCategories={selectedCategories} />
        </div>
      </div>
      {/* <CookieConsent>
This website uses cookies to enhance the user experience.
</CookieConsent> */}
      {/* <Fingerprint /> */}
    </div>
  );
}

export default ProjectsPage;
