package kissingturtles

import dsl.Position

class WallGeneratorService {
    // A maze is simply a function that returns the list of wall positions
    def mazes = [
            { grid -> ((grid/4)..(grid + 1 - grid/4)).collect { new Position(it, grid/2, 90, '+x') } },// horizontal line
            { grid -> ((grid/4)..(grid + 1 - grid/4)).collectMany { [new Position(it, grid/2, 90, '+x'), new Position(grid/2, it, 90, '+x')] } },// cross
            { grid -> def g = grid/5; (0..g).collectMany { [
                    new Position(g, g + it, 90, '+x'),
                    new Position(g + it, g, 90, '+x'),
                    new Position(grid - g, g + it, 90, '+x'),
                    new Position(grid - g - it, g, 90, '+x'),
                    new Position(g, grid - g - it, 90, '+x'),
                    new Position(g + it, grid -g, 90, '+x'),
                    new Position(grid - g, grid - g - it, 90, '+x'),
                    new Position(grid - g - it, grid - g, 90, '+x')
            ] } }// 4 corners
    ]

    def randomWallConfiguration() {
        new Random().nextInt(mazes.size())
    }

    def getWalls(def mazeId) {
        def gridSize = 15
        def myWalls = mazes[mazeId](gridSize)
        (0..gridSize-1).each() {
            myWalls << new Position(0, it, 90, '+x')
            myWalls << new Position(it, 0, 90, '+x')
            myWalls << new Position(gridSize-1, it, 90, '+x')
            myWalls << new Position(it, gridSize-1, 90, '+x')
        }
        myWalls
    }
}
