function clicked(i){
    
    fetch('/testdeletedel', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: i
          })
      })

}

