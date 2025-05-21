async function play(move_list){
    for (m in move_list){
        origin, target = m[0], m[1];
        move(origin, target);
        await sleep(600);
    }
}