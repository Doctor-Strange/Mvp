
import ContentLoader from "react-content-loader"
export const RequestCardPlaceholder = () => (
    <ContentLoader
        rtl
        height={250}
        width={530}
        speed={4}
        primaryColor="#d2d2d240"
        secondaryColor="#ecebeb40"
        style={{ width: '530px', maxWidth: '100%', height: '250px', maxHeight: '100%', margin: '10px auto' }}
    >
        <rect x="329" y="18" rx="3" ry="3" width="185" height="100" />
        <rect x="329" y="130" rx="5" ry="3" width="185" height="35" />
        <rect x="8" y="20" rx="3" ry="3" width="180" height="25" />
        <rect x="10" y="80" rx="3" ry="3" width="100" height="15" />
        <rect x="150" y="80" rx="3" ry="3" width="100" height="15" />
        <rect x="10" y="140" rx="3" ry="3" width="100" height="20" />
        <rect x="150" y="140" rx="3" ry="3" width="100" height="20" />
        <circle cx="28" cy="225" r="15" />
        <rect x="10" y="100" rx="3" ry="3" width="100" height="15" />
        <rect x="150" y="100" rx="3" ry="3" width="100" height="15" />
        <rect x="52" y="215" rx="10" ry="10" width="146" height="21" />
    </ContentLoader>
)