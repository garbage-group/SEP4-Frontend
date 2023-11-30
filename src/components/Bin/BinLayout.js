function BinLayout() {
    return (
        <div className={styles.app}>
            <BinSidebar />
            <Map />
            <InfoSidebar />
        </div>
    );
}

export default AppLayout