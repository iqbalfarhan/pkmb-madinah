import HeadingSmall from '@/components/heading-small';
import { Card, CardContent } from '@/components/ui/card';

const PpdbDocumentForm = () => {
  return (
    <div className="flex gap-6">
      <div className="w-1/3">
        <HeadingSmall title="Dokumen pendukung" description="Informasi tentang ayah dan ibu" />
      </div>
      <div className="w-2/3 space-y-6">
        <Card>
          <CardContent>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore commodi quae ex illo. Necessitatibus eligendi perferendis eum odit
            voluptas totam nihil unde ratione doloribus numquam vero deleniti, rerum enim perspiciatis.
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PpdbDocumentForm;
