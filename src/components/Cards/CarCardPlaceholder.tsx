
import ContentLoader from "react-content-loader"
export const CarCardPlaceholder = () => (
  <ContentLoader
    height={300}
    width={300}
    speed={4}
    rtl
    primaryColor="#d2d2d240"
    secondaryColor="#ecebeb40"
    style={{ width: '300px', height: '300px', margin: '10px auto' }}
    className="carcard"
  >
    <rect x="5" y="10" rx="3" ry="3" width="350" height="195" />
    <rect x="5" y="215" rx="3" ry="3" width="220" height="20" />
    <rect x="5" y="240" rx="3" ry="3" width="80" height="15" />
  </ContentLoader>
)