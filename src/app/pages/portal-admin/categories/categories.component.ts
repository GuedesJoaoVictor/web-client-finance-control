import { Component, OnInit, signal } from "@angular/core";
import { MatCard, MatCardContent } from "@angular/material/card";
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from "@angular/forms";
import { MatFormField, MatLabel, MatInput, MatError } from "@angular/material/input";
import { MatTable, MatHeaderCellDef, MatCellDef, MatTableDataSource, MatHeaderRowDef, MatRowDef, MatTableModule } from "@angular/material/table";
import { MatIcon } from "@angular/material/icon";
import { CategoryDTO } from "../../../core/dto/category.dto";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { CategoryService } from "../../../core/services/category.service";
import Swal from "sweetalert2";
import { MatAnchor } from "@angular/material/button";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css', '../users/users.component.css'],
    imports: [MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, MatTable, MatIcon, MatHeaderCellDef, MatCellDef, MatHeaderRowDef, MatRowDef, MatProgressSpinner, MatAnchor, MatTableModule]
})

export class CategoriesComponent implements OnInit {

    categoryForm!: FormGroup;
    categories = new MatTableDataSource<CategoryDTO>([]);
    displayedColumns: string[] = [ 'id', 'name', 'type', 'actions'];
    editMode: boolean = false;
    isLoading = signal(false)
    private currentCategoryId: number | null = null;

    constructor(private readonly fb: FormBuilder, private readonly categoryService: CategoryService) {
        this.initForm();
    }

    ngOnInit(): void {
        this.isLoading.set(true);
        this.categoryService.findAll().subscribe({
            next: (response) => {
                this.categories.data = response.data;
                this.isLoading.set(false);
            }, error: (err) => {
                console.error('Error fetching categories:', err);
                this.isLoading.set(false);
                Swal.fire('Error', 'Could not load categories. Please try again later.', 'error');
            }
        });
    }

    private initForm(): void {
        this.categoryForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            type: ['', [Validators.required]]
        });
    }

    updateBank(): void {
        this.editMode = false;
        this.isLoading.set(true);
        this.categoryService.update(this.currentCategoryId!, this.categoryForm.value).subscribe({
            next: (response) => {
                Swal.fire('Success', 'Category updated successfully!', 'success');
                const index = this.categories.data.findIndex(cat => cat.id === this.currentCategoryId);
                if (index !== -1) {
                    this.categories.data[index] = response.data;
                    this.categories._updateChangeSubscription();
                }
                this.categoryForm.reset({
                    name: '',
                    type: ''
                });
                this.isLoading.set(false);
            }, error: (err) => {
                console.error('Error updating category:', err);
                Swal.fire('Error', 'Could not update category. Please try again later.', 'error');
                this.isLoading.set(false);
            }
        });
    }

    addBank(): void {
        if (this.categoryForm.valid) {
            const { name, type } = this.categoryForm.value as CategoryDTO;
            const dto: CategoryDTO = { name, type };
            this.categoryService.create(dto).subscribe({
                next: (response) => {
                    Swal.fire('Success', 'Category created successfully!', 'success');
                    this.categories.data = this.categories.data.concat(response);
                    this.categories._updateChangeSubscription();
                    this.categoryForm.reset({
                        name: '',
                        type: ''
                    });
                }, error: (err) => {
                    console.error('Error creating category:', err);
                    Swal.fire('Error', 'Could not create category. Please try again later.', 'error');
                }
            });
        }
    }

    editCategory(category: CategoryDTO): void {
        this.categoryForm.setValue({
            name: category.name,
            type: category.type
        });
        this.editMode = true;
        this.currentCategoryId = category.id!;
    }

    deleteCategory(category: CategoryDTO): void {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete the category "${category.name}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                this.categoryService.delete(category.id!).subscribe({
                    next: (response) => {
                        this.categories.data = this.categories.data.filter(cat => cat.id !== category.id);
                        this.categories._updateChangeSubscription();
                        Swal.fire('Deleted!', `The category "${category.name}" has been deleted.`, 'success');
                    }, error: (err) => {
                        console.error('Error deleting category:', err);
                        Swal.fire('Error', 'Could not delete the category. Please try again later.', 'error');
                    }
                });
            }
        });
    }

}