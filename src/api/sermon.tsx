class Sermon {
    client;
    secondaryClient;

    constructor( client: any, secondaryClient?: any ) {
        this.client = client;
        this.secondaryClient = secondaryClient;
    }

    getSermons( payload: any ) {
        return this.client.get( "/sermons", payload );
    }

    // Add upload method that returns sermon data with ID
    uploadSermon( payload: FormData ) {
        return this.client.post( "/sermons/upload", payload );
    }

    // Get sermon by ID for link validation
    getSermonById( sermonId: string ) {
        return this.client.get( `/sermons/${sermonId}` );
    }

    // Get sermons by series for series links
    getSermonsBySeries( seriesId: string ) {
        return this.client.get( `/sermons/series/${seriesId}` );
    }
}

export default Sermon;