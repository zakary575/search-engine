// a button that when submited will search the input through the two search functions 
// if the search is empty a modal that tells them to put something in
// if we add a second page make it send them to the new page


const searchBox = document.querySelector(
    // searchbox id here
)

const valueCheck = function(){
    if( searchBox.value === ''){
        $( function() {
            $( "#dialog" ).dialog();
          } );
    }
}


addEventListener('submit', function(event){
    event.preventDefault();
    if (valueCheck){
        return;
    }
    fetchYoutubeVideos();
    fetchWikiArcticles()
})