import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FavoriteService } from './services/favorite.service';
import { FavoriteItem } from './models/favorite.model';

describe('FavoriteService', () => {
    let favoriteService: FavoriteService;
    let snackBarMock: any;
    let storeServiceMock: any;
    beforeEach(() => {
        snackBarMock = {
            open: jest.fn(),
        };
        storeServiceMock = {
            updateById: jest.fn().mockReturnValue({}),
        };

        favoriteService = new FavoriteService(snackBarMock, storeServiceMock, null as any);
    });

    describe('addToFavorite', () => {
        it('should add an item to favorites if it does not exist', () => {
            // Arrange
            const item: FavoriteItem = {
                id: 1,
                name: 'Sample Item',
                product: "", // Add the missing property
                price: 0, // Add the missing property
            };
            const code = 1;

            // Act
            favoriteService.addToFavorite(item, code);

            // Assert
            expect(favoriteService.favorite.value.items).toEqual([item]);
            expect(snackBarMock.open).toHaveBeenCalledWith(
                '1 item added to Favorite.',
                'Ok',
                { duration: 2000 }
            );
        });

        it('should remove an item from favorites if it already exists and code is not 1', () => {
            // Arrange
            const item: FavoriteItem = {
                id: 1,
                name: 'Sample Item',
                product: "", // Add the missing property
                price: 0, // Add the missing property
            };
            const existingItem = { ...item };
            const code = 0;
            favoriteService.favorite.next({ items: [existingItem] });

            // Act
            favoriteService.addToFavorite(item, code);

            // Assert
            expect(favoriteService.favorite.value.items).toEqual([]);
            expect(snackBarMock.open).toHaveBeenCalledWith(
                'Item removed in Favorite.',
                'Ok',
                { duration: 2000 }
            );
        });

        it('should show a message if the item already exists in favorites and code is 1', () => {
            // Arrange
            const item: FavoriteItem = {
                id: 1,
                name: 'Sample Item',
                product: "", // Add the missing property
                price: 0, // Add the missing property
            };
            const existingItem = { ...item };
            const code = 1;
            favoriteService.favorite.next({ items: [existingItem] });

            // Act
            favoriteService.addToFavorite(item, code);

            // Assert
            expect(favoriteService.favorite.value.items).toEqual([existingItem]);
            expect(snackBarMock.open).toHaveBeenCalledWith(
                'Item already in Favorite.',
                'Ok',
                { duration: 2000 }
            );
        });
    });

    // Add more tests for other methods if needed

});
