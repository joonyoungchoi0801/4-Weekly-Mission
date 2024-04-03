import Headerfolder from "@/components/folder/Headerfolder";
import Gnbfolder from "@/components/folder/Gnbfolder";
import Mainfolder from "@/components/folder/Mainfolder";
import Footer from "@/components/common/Footer";
import { FooterVisibility, GnbVisibility } from "@/hooks/useComponentVisible";

function Folder() {
  return (
    <FooterVisibility>
      <GnbVisibility>
        <Headerfolder />
        <Gnbfolder />
        <Mainfolder />
        <Footer />
      </GnbVisibility>
    </FooterVisibility>
  );
}

export default Folder;
